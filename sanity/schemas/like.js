export default {
    name: 'likes',
    title: 'Likes',
    type: 'document',
    fields: [
      {
        name: 'username',
        title: 'Username',
        type: 'string',
      },
      {
        name: 'tweetId',
        title: 'TweetId',
        description: 'Reference the Tweet the comment is associated to:',
        type: 'reference',
        to: {
          type: 'tweet',
        }
      },
    ]
  }
  