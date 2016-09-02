module.exports = {
  servers: {
    one: {
      host: '45.55.161.169',
      username: 'root',
      // pem:
      password: 'baturmatus1'
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'plan',
    path: '/Users/rafalcywinski/Desktop/planreact2',
    servers: {
      one: {}
    },
    buildOptions: {
     // serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://45.55.161.169',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
