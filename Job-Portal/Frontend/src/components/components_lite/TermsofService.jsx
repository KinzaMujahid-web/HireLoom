import React from "react";
import Navbar from "./Navbar";

const TermsOfService = () => {
  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-[#f4f7f7] py-12 px-4">
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">

        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-black mb-2">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Please read these terms carefully before using our platform
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            1. Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to HireLoom. These Terms and Conditions govern
            your use of our website located at www.Hireloom.com. By accessing
            or using our website, you agree to comply with these terms.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            2. Acceptance of Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            By using our website, you confirm that you accept these Terms and
            Conditions and agree to comply with them. If you do not agree, you
            must stop using the website.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            3. Changes to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms at any time. Changes will be effective
            immediately after posting. Continued use means you accept the
            updated terms.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            4. User Responsibilities
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use the website only for lawful purposes and not to
            harm, restrict, or interfere with others' use of the platform.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            5. Intellectual Property
          </h2>
          <p className="text-gray-600 leading-relaxed">
            All content belongs to HireLoom. You may not copy,
            distribute, or reuse content without permission.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are not responsible for any damages resulting from use of the
            website to the fullest extent permitted by law.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            7. Governing Law
          </h2>
          <p className="text-gray-600 leading-relaxed">
            These terms are governed by applicable laws of your jurisdiction.
            Any disputes will be handled in the appropriate courts.
          </p>
        </div>

        {/* Section 8 */}
        <div>
          <h2 className="text-xl font-bold text-[#34C6B3] mb-2">
            8. Contact Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions, contact us at HireLoom@gmail.com.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TermsOfService;