on("issues.opened").comment(`
  Hello @{{ sender.login }}. Thanks for inviting me to your project.
  Read more about [all the things I can help you with][config]. I can't
  wait to get started!

  [config]: https://github.com/bkeepers/PRobot/blob/master/docs/configuration.md
`);

// Delete :+1: comments
const singleEmoji = /^\W*(:[\w-\+]+:|[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])\W*$/g;
on('issue_comment.created')
  .filter(event => event.payload.comment.body.match(singleEmoji))
  .deleteComment();

function isDeleted(event) {
  return event.payload.action === 'deleted' &&
  event.payload.sender.login !== 'probot-demo[bot]';
}

// restore deleted comments but the one deleted by PRobot
on('issue_comment', 'commit_comment', 'pull_request_review_comment')
.filter(isDeleted)
.comment(`
Hi @{{ sender.login }}. Please don't delete comments.
Deleted comment from {{ comment.user.login }} at {{ comment.updated_at }} was
{{ comment.body }}
`);

const memberBerry = /[Mm]ember.*\?/g;
on('issue_comment.created')
  .filter(event => event.payload.comment.body.match(memberBerry) && event.payload.sender.login !== 'probot-demo[bot]')
  .comment(`> {{ comment.body }}

![image](https://cloud.githubusercontent.com/assets/1872314/21261671/370ad384-c38d-11e6-8c0e-f08443ebf87d.png)
`);
