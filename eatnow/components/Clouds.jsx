const Clouds = () => {
  return (
    <div className="bg-white py-12 sm:py-20">
      <p className="ml-4 my-2">
        Connect and sync with your favorite apps and data sources
      </p>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
          <div className="bg-gray-400/5 p-8 sm:p-10">
            <img
              alt="Transistor"
              src="/images/sforce.png"
              className="w-[100px] object-contain"
            />
          </div>
          <div className="bg-gray-400/5 p-6 sm:p-10">
            <img
              alt="Reform"
              src="/images/facebooklogo.png"
              className="w-[100px] object-contain"
            />
          </div>
          <div className="bg-gray-400/5 p-6 sm:p-10">
            <img
              alt="Google-Sheets"
              src="/images/google-sheets.png"
              className="w-[100px] object-contain"
            />
          </div>
          <div className="bg-gray-400/5 p-6 sm:p-10">
            <img
              alt="Laravel"
              src="/images/nationbuild.png"
              className="w-[100px] object-contain rounded-md"
            />
          </div>
          <div className="bg-gray-400/5 p-6 sm:p-10">
            <img
              alt="SavvyCal"
              src="/images/webflow.png"
              className="w-[100px] object-contain"
            />
          </div>
          <div className="bg-gray-400/5 p-6 sm:p-10">
            <img
              alt="Google-Drive"
              src="/images/google_drive.png"
              className="w-[100px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clouds;
