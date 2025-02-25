import DefaultPageLayout from "../layout/DefaultPageLayout";
import email from "../../images/email-image.png";
import {USER, DOMAIN} from "../../constants/const";

const get_addr = () => {
  return 'mailto:' + USER + '@' + DOMAIN;
}

function ContactPageContent() {
  return <>
    <div className="container">
      <h3>Contact us</h3>
      <p>This website is still in development. For any issues, suggestions and feedback, use the following form to get in touch. You can also email us directly on
        <a href={get_addr()}><img className="img-size" src={email} alt="protvar-email" /></a>,
        especially if you would like to send attachments or screenshots.</p>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfVhyTjeH5NG0QnYU0LozFR1tlkiNvl8nN5g5pIrcL76yO4YA/viewform?embedded=true"
        width="760" height="970" frameBorder={0} marginHeight={0} marginWidth={0} title="Contact us" id="googleContactForm"
      >
        Loading...
      </iframe>
    </div>
  </>
}

function ContactPage() {
  return <DefaultPageLayout content={<ContactPageContent />} />
}
export default ContactPage;