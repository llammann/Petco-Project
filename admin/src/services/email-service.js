import { send, init } from "emailjs-com";

const serviceId = "service_oftgwyg";
const templateId = "template_9kao2ha";
const userID = "KrPLnMyKgNMLo33hc";

const sendEmail = (content) => {
  init(userID);
  const toSend = {
    from_name: "petco@adoption.com",
    to_name: content.name,
    to_email: content.email,
    message: content.message,
    Author:content.author,
    Title:content.title,
    Content:content.content,
    tag:content.tag
  };
  send(serviceId, templateId, toSend)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { sendEmail };