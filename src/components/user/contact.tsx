import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function ContactSection14() {
    const defaultProps = {
        center: {
            lat: 21.0285,
            lng: 105.8040
        },
        zoom: 10
      };
  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
        <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={21.0285}
          lng={105.8040}
          text=""
        />
      </GoogleMapReact>
    </div>
          <form action="#" className="flex flex-col gap-4 lg:max-w-sm">
            <h6 className="text-left font-semibold text-gray-600">
              Thông tin liên hệ
            </h6>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="mb-2 text-left font-medium text-gray-900">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="first-name"
                  className="w-full p-3 border border-gray-300 rounded focus:border-gray-900"
                />
              </div>

            </div>
            <div>
              <label className="mb-2 text-left font-medium text-gray-900">
                Your Email
              </label>
              <input
                type="email"
                placeholder="name@email.com"
                name="email"
                className="w-full p-3 border border-gray-300 rounded focus:border-gray-900"
              />
            </div>
            <div>
              <label className="mb-2 text-left font-medium text-gray-900">
                Your Message
              </label>
              <textarea
                rows={6}
                placeholder="Message"
                name="message"
                className="w-full p-3 border border-gray-300 rounded focus:border-gray-900"
              />
            </div>
            <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection14;
