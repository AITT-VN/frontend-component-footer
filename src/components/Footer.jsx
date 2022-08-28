import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { sendTrackEvent } from "@edx/frontend-platform/analytics";
import { ensureConfig } from "@edx/frontend-platform/config";
import { AppContext } from "@edx/frontend-platform/react";

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

import './index.scss';
import FacebookImg from "../images/facebook.png"
import YoutubeImg from "../images/youtube.png"
import LogoLargeImg from "../images/logo_large.png"
import OpenEdxImg from "../images/openedx.png"
import TutorImg from "../images/tutor.png"


ensureConfig(["LOGO_TRADEMARK_URL"], "Footer component");

const EVENT_NAMES = {
  FOOTER_LINK: "edx.bi.footer.link",
};

class SiteFooter extends React.Component {
  constructor(props) {
    super(props);
    this.externalLinkClickHandler = this.externalLinkClickHandler.bind(this);
  }

  externalLinkClickHandler(event) {
    const label = event.currentTarget.getAttribute("href");
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: "outbound_link",
      label,
    };
    sendTrackEvent(eventName, properties);
  }

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <div class="container-fluid footer">
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-4">
                    <img src={LogoLargeImg} class="img-responsive logo" />
                    <p class="my-3">Kết nối với chúng tôi:</p>
                    <a href="https://www.facebook.com/ohstem.aitt/" target="_blank" class="social-icon">
                      <img src={FacebookImg} />
                    </a>
                    <a href="https://www.youtube.com/c/Ohstem" target="_blank" class="social-icon">
                      <img src={YoutubeImg} />
                    </a>
                </div>
                <div class="col-12 col-sm-8">
                    <div class="row">
                        <div class="col-12 col-sm-6 col-md-4">
                            <p><a href={config.LMS_BASE_URL + "/courses"}>Các khóa học</a></p>
                            <p><a href={config.LMS_BASE_URL + "/faq"}>Các câu hỏi thường gặp</a></p>
                            <p><a href="https://discord.com/channels/962380027536764968/962380027972968450">Trung tâm trợ giúp</a></p>
                        </div>
                        <div class="col-12 col-sm-6 col-md-4">
                            <p><a href="https://ohstem.vn/ve-ohstem-education/">Giới thiệu về OhStem</a></p>
                            <p><a href="https://ohstem.vn/chinh-sach-bao-mat-thong-tin/">Quyền riêng tư</a></p>
                            <p><a href="https://ohstem.vn/chinh-sach-quy-dinh-chung/">Điều khoản</a></p>
                        </div>
                        <div class="col-sm-12 col-md-4 credit">
                            <p><img src={OpenEdxImg} /></p>
                            <p><img src={TutorImg} /></p>
                        </div>
                    </div>
                </div>
            </div>

            <p class="copy-right text-center">© 2022 OhStem Education</p>
        </div>
        <hr class="hr-footer" />
    </div>
    );
  }
}

SiteFooter.contextType = AppContext;

SiteFooter.propTypes = {
  intl: intlShape.isRequired,
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default injectIntl(SiteFooter);
export { EVENT_NAMES };
