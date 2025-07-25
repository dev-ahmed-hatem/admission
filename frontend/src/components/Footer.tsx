import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-calypso-950 text-white py-6 padding-container mt-10">
      <div
        className="max-w-7xl mx-auto flex flex-wrap
      justify-between items-center gap-4"
      >
        {/* Logo */}
        <a href="https://kaffo.co" className="rounded-full overflow-hidden">
          {/* <Logo className="fill-orange hover:fill-orange-200 size-40" /> */}
          <img src="/logo.jpeg" alt="faculty logo" />
        </a>

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold">نظام إدارة تسجيل الطلاب</h2>
          <p className="text-sm text-gray-400 mt-2">
            منصة إدارة طلبات الالتحاق والتنسيق.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-12 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة - نظام إدارة تسجيل
        الطلاب{" "}
        <a href="https://kaffo.co" className="font-semibold ms-1 text-white">
          Kaffo
        </a>
      </div>
    </footer>
  );
};

export default Footer;
