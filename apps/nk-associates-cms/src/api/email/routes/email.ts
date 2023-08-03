module.exports = {
  routes: [
    {
      method: "POST",
      path: "/send-email",
      handler: "email.send",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
