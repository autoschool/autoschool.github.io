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
    twoWeeksAgo = moment().subtract('weeks', 2);
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

    $(function() {
        $.when.apply($, teams.map(fetchCommits)).done(function() {
            var results = Array.prototype.slice.call(arguments);
            var commits = _.flatten(results.map(function(result, i) {
                var commits = result[0];
                commits.forEach(function(commit) {
                    commit.team = teams[i];
                });
                return commits;
            }));
            $('#counter').html(commits.length + ' commits since ' + twoWeeksAgo.format('ddd, D MMMM YYYY'));
            new CommitsView($('#commits'), commits, $('#commitTpl').html());
        });
    });



})(window, window.jQuery, window._);
