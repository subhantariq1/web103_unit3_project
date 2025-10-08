import React from 'react';

const HomePage = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>Welcome to Our Website</h1>
                <p>Your one-stop solution for all your needs!</p>
            </header>
            <main style={styles.main}>
                <section style={styles.section}>
                    <h2>About Us</h2>
                    <p>
                        We are dedicated to providing the best services and products to our customers.
                        Explore our website to learn more about what we offer.
                    </p>
                </section>
                <section style={styles.section}>
                    <h2>Contact Us</h2>
                    <p>Email: contact@ourwebsite.com</p>
                    <p>Phone: +123 456 7890</p>
                </section>
            </main>
            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Our Website. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        margin: 0,
        padding: 0,
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '20px 0',
    },
    main: {
        padding: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '10px 0',
        marginTop: '20px',
    },
};

export default HomePage;