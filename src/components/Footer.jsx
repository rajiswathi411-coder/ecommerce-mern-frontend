import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} GadgetHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;