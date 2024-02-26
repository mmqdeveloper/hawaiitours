import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <div className="wrap">
          <div className="title">Support</div>
          <ul class="fList">
            <li class="fListItem location-footer">55-541 Naniloa Loop,
              Laie, HI 96762</li>
            <li class="fListItem phone-footer"><a href="tel:0123456789">0123456789</a></li>
            <li class="fListItem email-footer"><a href="mailto:info@gmail.com">info@gmail.com</a></li>
            <li class="fListItem open-daily"><strong>Open Daily: </strong>
              5:00am to 9:00pm, HST</li>
          </ul>
        </div>
        <div className="wrap">
          <div className="title">Support</div>
          <ul className="fList">
            <li className="fListItem">Homes </li>
            <li className="fListItem">Apartments </li>
            <li className="fListItem">Resorts </li>
            <li className="fListItem">Villas</li>
            <li className="fListItem">Hostels</li>
            <li className="fListItem">Guest houses</li>
          </ul>
        </div>
        <div className="wrap">
          <div className="title">Support</div>
          <ul className="fList">
            <li className="fListItem">Unique places to stay </li>
            <li className="fListItem">Reviews</li>
            <li className="fListItem">Unpacked: Travel articles </li>
            <li className="fListItem">Travel communities </li>
            <li className="fListItem">Seasonal and holiday deals </li>
          </ul>
        </div><div className="wrap">
          <div className="title">Support</div>
          <ul className="fList">
            <li className="fListItem">Car rental </li>
            <li className="fListItem">Flight Finder</li>
            <li className="fListItem">Restaurant reservations </li>
            <li className="fListItem">Travel Agents </li>
          </ul>
        </div>
        <div className="wrap">
          <div className="title">Support</div>
          <ul className="fList">
            <li className="fListItem">Curtomer Service</li>
            <li className="fListItem">Partner Help</li>
            <li className="fListItem">Careers</li>
            <li className="fListItem">Sustainability</li>
            <li className="fListItem">Press center</li>
            <li className="fListItem">Safety Resource Center</li>
            <li className="fListItem">Investor relations</li>
            <li className="fListItem">Terms & conditions</li>
          </ul>
        </div>
      </div>
      <div className="coppyright">© Copyright Supper Tour 2024</div>
    </div>
  );
};

export default Footer;
