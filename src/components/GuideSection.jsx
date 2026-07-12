import React from "react";

function GuideSection(prop){
return (<section className="guide-section">
  <h2>{prop.title}</h2>
  <ul className="link-list">
    <li>
      <a href={prop.link}>{prop.linkTitle}</a>
      <p className="link-description">
        {prop.desc}
      </p>
    </li>
  </ul>
</section>);

}

export default GuideSection;