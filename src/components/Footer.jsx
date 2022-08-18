import React from "react";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "@edx/frontend-platform/i18n";
import { sendTrackEvent } from "@edx/frontend-platform/analytics";
import { ensureConfig } from "@edx/frontend-platform/config";
import { AppContext } from "@edx/frontend-platform/react";

import FacebookImg from "../images/facebook.png"
import YoutubeImg from "../images/youtube.png"
import GithubImg from "../images/github.png"

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
    return (
      <footer role="contentinfo" className="footer border-top py-3 px-4">
        <div className="container-fluid d-flex justify-content-between">
          <div className="d-flex w-40">
            <div className="w-50">
              <a className="d-block mt-1" href="https://ohstem.vn/ve-ohstem-education/">
                <p class="fs-5">Về OhStem</p>
              </a>
              <a className="d-block mt-1" href="https://ohstem.vn/tin-tuc/">
                <p class="fs-5">Tin tức</p>
              </a>
              <a className="d-block mt-1" href="https://ohstem.vn/lien-he/">
                <p class="fs-5">Liên hệ</p>
              </a>
            </div>
            <div className="w-50">
              <a className="d-block mt-1" href="{config.LMS_BASE_URL}/courses">
                <p class="fs-5">Các khóa học</p>
              </a>
              <a className="d-block mt-1" href="{config.LMS_BASE_URL}/faq">
                <p class="fs-5">Các câu hỏi thường gặp</p>
              </a>
              <a className="d-block mt-1" href="https://discord.com/channels/962380027536764968/962380027972968450">
                <p class="fs-5">Trung tâm trợ giúp</p>
              </a>
            </div>
          </div>
          <div className="d-flex w-50">
            <div className="w-50">
              <p class="fs-5">Kết nối cùng OhStem</p>
              <div className="d-flex">
                <div className="mr-2">
                  <a
                    href="https://www.facebook.com/ohstem.aitt/"
                    target="_blank"
                    rel="noopener nofollow"
                    title="Facebook"
                    aria-label="Facebook"
                  >
                    <img src={FacebookImg} width="30px" height="30px"/>
                  </a>
                </div>
                <div className="mr-2">
                  <a
                    href="https://www.youtube.com/channel/UCMPfFJjpAUEy5JiNlKKw-1A"
                    target="_blank"
                    rel="noopener nofollow"
                    title="YouTube"
                    aria-label="YouTube"
                  >
                    <img src={YoutubeImg} width="30px" height="30px"/>
                  </a>
                </div>
              </div>
              <div class="u-flex u-flexColumn u-marginBottomLarge">
                <a class="u-block u-marginTopSmall" href="https://openedx.org/">
                  <img src="https://files.edx.org/openedx-logos/edx-openedx-logo-tag.png" alt="Powered by Open edX" width="80" />
                </a>
                <span class="fs-5">edX, Open edX và các biểu tượng tương ứng đã được đăng ký tên thương mại thuộc edX Inc.</span>
            </div>
            </div>
            <div className="w-50">
              <a className="d-block" href="https://ohstem.vn">
                <img src="https://ohstem.vn/wp-content/uploads/2021/01/logo-ohstem.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="container-fluid d-flex justify-content-center">
          <p class="fs-5">&copy; 2022: Bản quyền thuộc về OhStem Education và đã được bảo hộ</p>
        </div>
        
      </footer>
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
