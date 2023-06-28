import React from 'react';
import "./Contact.css";
import JoinInvitation from "./JoinInvitation";
import CommonQuestions from "./CommonQuestions";
import CollaborationInvitation from "./CollaborationInvitation";

const Contact = () => {
  return (
    <main className='contactScreen'>
      <JoinInvitation />
      <CommonQuestions />
      <CollaborationInvitation />
    </main>
  );
};

export default Contact;