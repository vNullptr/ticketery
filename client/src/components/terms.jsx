import React from 'react'

const Terms = (props) => {
  return (
    <div className="absolute flex flex-col items-center z-100 bg-black h-screen w-[400px] md:w-[700px] border-r-1 border-l-1 border-primary">
        <button 
        className="absolute top-4 right-4 text-primary hover:text-white text-2xl"
        aria-label="Close ticket"
        onClick={props.closeButton}
        >
            <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:opacity-80 hover:scale-95 transition-all duration-75" // Optional hover effect
            >
                {/* Diagonal from top-left to bottom-right */}
                <path
                    d="M6 6L18 18"
                    stroke="#E0DCC3"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                />
                {/* Diagonal from top-right to bottom-left */}
                <path
                    d="M18 6L6 18"
                    stroke="#E0DCC3"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                />
            </svg>
        </button>

        <h1 className="text-5xl font-bold text-primary mt-10 text-center">Termes et Conditions</h1>
        <div className="p-20 text-primary whitespace-pre-line overflow-auto">
            {`Last updated: 02/07/2025

            LUST Events (“we”, “our”, or “us”) is committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible way. This Privacy Policy outlines how we collect, use, and protect the information you provide when using our website.

            ⸻

            Information We Collect

            When you visit our website or purchase a ticket, we may collect the following information:
                •    Full name
                •    Email address
                •    Phone number
                •    Payment information (handled securely via third-party payment processors)
                •    IP address and browsing data

            ⸻

            How We Use Your Information

            The data we collect is used to:
                •    Process your ticket purchase
                •    Send confirmations and important event updates
                •    Respond to your inquiries
                •    Improve your experience on our website
                •    Comply with legal obligations

            ⸻

            Sharing Your Data

            We do not sell your personal information. We may share your data with:
                •    Trusted third-party service providers (such as payment processors) for the sole purpose of operating the event and website
                •    Authorities if legally required

            ⸻

            Data Security

            We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.

            ⸻

            Your Rights

            Depending on your location, you may have the right to:
                •    Access, correct, or delete your personal data
                •    Object to or restrict our processing of your data
                •    Withdraw consent at any time (where applicable)
            
            Cookies

            We use cookies to improve website functionality and user experience. By using our website, you consent to the use of cookies in accordance with our Cookie Policy.

            ⸻

            Ticket Refund Policy

            All ticket sales are final. Tickets purchased for LUST Events are non-refundable under any circumstances, including but not limited to personal scheduling conflicts, illness, travel issues, or dissatisfaction with the event. Please ensure your availability before completing your purchase.

            ⸻

            Changes to This Policy

            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.

            ⸻

            Contact Us

            If you have any questions or concerns about this Privacy Policy, please contact us at:
            rakravescene@gmail.com`}
        </div>
    </div>
  )
}

export default Terms