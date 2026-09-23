function Contact() {
    return (
        <section className="section contact-section" id="contact">
            <div className="section-container">
                <div className="section-title">
                    <p>Let's connect</p>
                    <h2>Contact Me</h2>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-text">
                        <h3>Let's build something interesting.</h3>

                        <p>
                            You can find my projects on GitHub. I am always
                            interested in learning new technologies and working
                            on new ideas.
                        </p>
                    </div>

                    <div className="contact-links">
                        <a
                            href="https://github.com/ErasylKbtu"
                            target="_blank"
                            rel="noreferrer"
                            className="contact-card"
                        >
                            <span className="contact-icon">⌘</span>

                            <div>
                                <small>GitHub</small>
                                <strong>ErasylKbtu</strong>
                            </div>

                            <span className="arrow">→</span>
                        </a>

                        <div className="contact-card">
                            <span className="contact-icon">🌍</span>

                            <div>
                                <small>Location</small>
                                <strong>Planet Earth C-137</strong>
                            </div>
                        </div>

                        <div className="contact-card">
                            <span className="contact-icon">💬</span>

                            <div>
                                <small>Status</small>
                                <strong>Open to learning</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;