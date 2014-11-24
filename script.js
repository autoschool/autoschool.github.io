(function (exports, $, _){
    var teams = [
        'baguette',
        'hlebushek',
        'splinter',
        'switter',
        'twister',
        'vorobushek',
        'ya.blogo',
        'zlogger'
    ],
    twoWeeksAgo = moment().subtract(2, 'weeks');
    function fetchCommits(team) {
        var commitUrl = 'https://api.github.com/repos/autoschool/{team}/commits?client_id={id}&client_secret={secret}&since={since}';
        return $.getJSON(commitUrl
            .replace('{team}', team)
            .replace('{id}', '933ebc0ad1bd61fbc7fa')
            .replace('{secret}', '5bdca935f01ae215547868660ea8fe53a3d0ffb2')
            .replace('{since}', twoWeeksAgo.toJSON())
        )
    }

    function CommitsView(elm, commits, itemTemplate) {
        commits.sort(function(a, b) {
            return new Date(b.commit.author.date) - new Date(a.commit.author.date);
        });
        var html = _.template(itemTemplate)({commits: commits});
        elm.html(html)
    }

    function TeamsViewChart(elm, data, range) {
        this.barHeight = 30;
        var margin = {
                left: 150,
                top: 20,
                right: 40,
                bottom: 40
            },
            chartWidth = elm.width() - margin.left - margin.right,
            chartHeight = this.barHeight * data.reduce(function(total, team) {
                return total + team.members.length + 1;
            }, 0),
            x = this.x = d3.time.scale().domain(range).nice().range([0, chartWidth]),
            xAxis = d3.svg.axis().scale(x).orient('bottom').tickFormat(function(d) {
                return moment(d).format('D MMM');
            });
        this.svg = d3.select(elm[0]).append('svg').style('height', chartHeight + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ','+ margin.top +')');
        this.svg.append('g').classed('chart-group', true);
        this.svg.append('g').classed('x-axis-group axis', true);
        this.svg.append('g').classed('x-axis-group-top axis', true);
        this.svg.append('g').classed('y-axis-group axis', true);
        this.svg.select('.x-axis-group.axis').attr({transform: 'translate(0,' + (chartHeight) + ')'}).call(xAxis);
        this.svg.select('.x-axis-group-top.axis').call(d3.svg.axis().scale(x).orient('top').tickFormat(function(d) {
            return moment(d).format('D MMM');
        }));

        //create empty set of lines
        var stripesPlaceholder = this.svg.select('.chart-group').selectAll('line.x');
        //fill the set real data
        stripesPlaceholder.data(x.ticks()).enter().append('line')
            .attr({ 'class': 'tick-line', x1: x, x2: x, y1: 0, y2: chartHeight });

        this.teamOffset = 0;
        data.forEach(this.renderTeam, this)
    }
    TeamsViewChart.prototype.renderTeam = function(team) {
        var x = this.x,
            height = (team.members.length+1)*this.barHeight,
            y = d3.scale.ordinal().domain([''].concat(team.members)).rangePoints([0, height], 1),
            elm = this.svg.select('.chart-group')
                .append('g')
                .classed('timeline-group', true)
                .attr('transform', 'translate(0, '+this.teamOffset+')');
        var bars = elm.selectAll('.point').data(team.commits).enter().append('circle');

        bars.attr({
            'class': 'point',
            r: 7,
            cx: function(d) {
                return x(new Date(d.commit.author.date))
            },
            cy: 0
        });
        bars.transition().duration(500).attr({
            cy: function (d) {
                return y(d.user);
            }
        });
        this.renderTeamTitle(elm, team, x, y);

        elm.append('g').classed('axis', true).call(
            d3.svg.axis().scale(y).orient('left').outerTickSize(0)
        );
        this.teamOffset += height;
    };
    TeamsViewChart.prototype.renderTeamTitle = function(elm, team, x, y) {
        elm.append('rect').classed('timeline-group-cover', true).attr({
            "x": x.range()[0]+0.5,
            "y": 0,
            "width": x.range()[1] - x.range()[0],
            "height": y.range()[1] - y.range()[0]
        });
        elm.append('text').text(team.title).attr({
            'class': 'timeline-group-title',
            y: y(0),
            dy: '1.2em',
            dx: '1em'
        });
    };

    $(function() {
        $.when.apply($, teams.map(fetchCommits)).done(function() {
            var results = Array.prototype.slice.call(arguments);
            var commits = _.flatten(results.map(function(result, i) {
                var commits = result[0];
                commits.forEach(function(commit) {
                    commit.team = teams[i];
                    commit.user = commit.author ? commit.author.login : 'undefined';
                });
                return commits;
            }));
            $('#counter').html(commits.length + ' commits since ' + twoWeeksAgo.format('ddd, D MMMM YYYY'));
            new CommitsView($('#commits'), commits, $('#commitTpl').html());
            var chartData = _.chain(commits).groupBy('team').pairs().sortBy('0').map(function(val) {
                return {
                    title: val[0],
                    members: _.chain(val[1]).pluck('user').uniq().sortBy(function(d) {
                        return d === 'undefined' ? "0" : d.toLowerCase();
                    }).value(),
                    commits: val[1]
                }
            }).value();
            new TeamsViewChart($('#graph'), chartData, [twoWeeksAgo.toDate(), new Date()]);
        });
    });



})(window, window.jQuery, window._);
