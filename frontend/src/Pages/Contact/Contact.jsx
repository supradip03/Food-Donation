import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just simulate success
    toast.success("Message sent successfully!");

    setData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full overflow-x-hidden flex items-center justify-center bg-linear-to-br bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-600">
          Contact Us 📞
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Your Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            value={data.message}
            onChange={(e) => setData({ ...data, message: e.target.value })}
            required
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>

        </form>

        {/* EXTRA INFO */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          📧 support@fooddonate.com <br />
          📍 India
        </div>

      </div>
    </div>
  );
};

export default Contact;