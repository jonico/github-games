on("issues.opened").comment(`
  Hello @{{ sender.login }}. Thanks for inviting me to your project.
  Read more about [all the things I can help you with][config]. I can't
  wait to get started!

  [config]: https://github.com/bkeepers/PRobot/blob/master/docs/configuration.md
`);

// ASG Spez edition
const asgSpez = /ASG/g;
on('issue_comment.created')
  .filter(event => event.payload.comment.body.match(asgSpez) && event.payload.sender.login !== 'probot-demo[bot]')
  .comment(`ASG Spez rocks :metal:
  :ship: it!
  ![giphy 2](https://cloud.githubusercontent.com/assets/395397/14451851/3abad496-003f-11e6-9a35-1ba112d981d7.gif)
`);


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
