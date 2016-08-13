module.exports = {
  servers: {
    one: {
      host: '159.203.191.162',
      username: 'root',
      "password": "No1!HApp"
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'hierarchy',
    path: '/Users/kestanous/dev/play/hierarchy',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://159.203.191.162',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    "dockerImage": "abernix/meteord:base",
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
