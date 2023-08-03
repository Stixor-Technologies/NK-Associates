module.exports = {
    async send(ctx) {
      const {name, email, phone, category, message } = ctx.request.body;  
      await strapi.plugins['email'].services.email.send({
        to: "fawad.mehmood@stixor.com",
        from: "fawad.mehmood@stixor.com",
        replyTo: email,
        subject: `Contact request from ${name}`,
        text: message,
        html: `<p>${message}</p>`,
      });
  
      return { message: "Email sent"};
    },
  };
  