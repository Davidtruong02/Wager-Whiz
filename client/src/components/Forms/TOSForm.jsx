import React from "react";
import "../../App.css";

function TOSForm({ setTosModalShow, setTosChecked }) {
  return (
    <>
      <div className="tosContainer">
        <h3 style={{ textDecoration: "underline" }}>Terms of Service</h3>
        <p>
          Welcome to WagerWhiz! These terms outline the rules and regulations
          for the use of our website.
        </p>
        <p>
          By accessing this website, we assume you accept these terms and
          conditions. Do not continue to use WagerWhiz if you do not agree to
          all of the terms and conditions stated on this page.
        </p>

        <h4 style={{ textDecoration: "underline" }}>Disclaimer:</h4>
        <p>
          WagerWhiz does not claim ownership the the rights to NBA or MLB team
          and brand logos and trademarks. All such rights belong to their
          respective owners.
        </p>

        <h4 style={{ textDecoration: "underline" }}>Stripe Functionality:</h4>
        <p>
          Please note that while Stripe functionality may be displayed on our
          website, this is for demonstration purposes only, as this website is a
          school project and is not intended for commercial use.
        </p>

        <h4 style={{ textDecoration: "underline" }}>Responsibility:</h4>
        <p>
          We urge all users to gamble responsibly. Gambling can be addictive,
          and we encourage our users to set limits and seek help if gambling
          becomes problematic.
        </p>

        <h4 style={{ textDecoration: "underline" }}>Resources:</h4>
        <p>
          For assistance with gambling addiction, we recommend contacting
          Gamblers Anonymous or seeking support from other appropriate
          resources. Visit the{" "}
          <a
            href="https://www.gamblersanonymous.org/ga/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GA website
          </a>{" "}
          or call 1-800-GAMBLER.
        </p>

        <h4 style={{ textDecoration: "underline" }}>Contact Us:</h4>
        <p>
          If you have any comments or questions about these Terms of Service,
          please contact us email@email.com
        </p>
      </div>
      <div className="tosAccept">
        <button
          className="btn btn-primary"
          onClick={() => {
            setTosModalShow(false);
            setTosChecked(true);
          }}
        >
          Accept
        </button>
      </div>
    </>
  );
}

export default TOSForm;
