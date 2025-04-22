import { FaPhoneAlt } from 'react-icons/fa';

const offices = [
  {
    name: 'PT. SENTOSAKARYA ADITAMA Bekasi (Pusat)',
    address:
      'Jl. Balai Desa No.2A, RT.001/RW.004, Jatirasa, Kec. Jatiasih, Kota Bks, Jawa Barat 17424',
    phone: '(021) 82400849',
    mapLink:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15863.047182879209!2d106.9676043!3d-6.2950034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69930063108513%3A0xc77e7b5569acc04e!2sPT.%20SENTOSAKARYA%20ADITAMA%20(PUSAT)!5e0!3m2!1sid!2sid!4v1720593270927!5m2!1sid!2sid',
  },
  {
    name: 'PT. SENTOSAKARYA ADITAMA Cilacap (Cabang)',
    address:
      'Jl. Cimanuk No.31, RT.006/RW.003, Jati, Karangmangu, Kec. Kroya, Kabupaten Cilacap, Jawa Tengah 53282',
    phone: '0822-9898-3076',
    mapLink:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15817.732130348648!2d109.2411865!3d-7.6364926!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e654100615bb33b%3A0xcb69e3e5a7bcb485!2sPT.%20SENTOSAKARYA%20ADITAMA%20(CABANG%20CILACAP)!5e0!3m2!1sid!2sid!4v1720593456938!5m2!1sid!2sid',
  },
  {
    name: 'PT. SENTOSAKARYA ADITAMA Subang (Cabang)',
    address:
      'Dusun Krajan II No.RT.10/03, Sukareja, Kec. Sukasari, Kabupaten Subang, Jawa Barat 42154',
    phone: '0852-0406-4264',
    mapLink:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15862.887984087778!2d107.7920284!3d-6.3002138!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6947c25e6e52d3%3A0x96f6ec617c09d8bf!2sPT.%20SENTOSAKARYA%20ADITAMA%20SUBANG!5e0!3m2!1sid!2sid!4v1720593780686!5m2!1sid!2sid',
  },
  {
    name: 'PT. SENTOSAKARYA ADITAMA Cirebon (Cabang)',
    address:
      'DUSUN 03, RT.02/RW.05, Babakan Gebang, Kec. Babakan, Kabupaten Cirebon, Jawa Barat 45191',
    phone: '(0231) 665190',
    mapLink:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1151.5001384541326!2d108.71763632096471!3d-6.871720109340307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f0700278daa79%3A0x388f3374038f0c94!2sPT.%20SENTOSAKARYA%20ADITAMA%20(CABANG%20CIREBON)!5e0!3m2!1sid!2sid!4v1720593928927!5m2!1sid!2sid',
  },
];

const ContactSection = () => {
  return (
    <div className="bg-white py-20 sm:py-18 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
        <div className="text-center">
          <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
            Mudah untuk dijangkau
          </p>
          <p className="max-w-xl mt-5 mx-auto text-gray-600 text-xl">
            Kamu dapat dengan mudah menghubungi tim kami, baik secara online
            melalui telepon maupun secara offline mengunjungi kantor kami. Kami
            siap melayani Kamu dengan cara yang paling nyaman untuk Kamu.
          </p>
          <div className="mt-6">
            <a
              href="https://api.whatsapp.com/send?phone=6282298983076"
              target="_blank"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-secondary-800 hover:bg-primary-secondary-900"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <div
              key={index}
              className="flex flex-col bg-primary-secondary-900 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold  text-white uppercase">
                {office.name}
              </h3>
              <p className="mt-2 text-gray-400">{office.address}</p>
              <p className="mt-2 text-gray-400 flex items-center justify-center md:jsutify-start">
                <FaPhoneAlt className="mr-2" />
                Telepon: {office.phone}
              </p>
              <div className="mt-4">
                <iframe
                  src={office.mapLink}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
