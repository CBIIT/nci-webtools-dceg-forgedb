export default function Footer() {
  return (
    <footer className="flex-grow-0">
      <div class="bg-primary-blue-footer text-light py-3 pb-1">
        <div class="container">
          <p class="h6">Reference</p>
          <ol>
            <li>
              Breeze, C.E., Haugen, E., Gutierrez-Arcelus, M., Yao, X.,
              Teschendorff, A., Beck, S., Dunham, I., et al. (2024). FORGEdb: a
              tool for identifying candidate functional variants and uncovering
              target genes and mechanisms for complex diseases.{" "}
              <a
                href="https://genomebiology.biomedcentral.com/articles/10.1186/s13059-023-03126-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light mb-1"
              >
                <u> Genome Biol. 25, 3. 10.1186/s13059-023-03126-1.</u>
              </a>
            </li>
          </ol>
        </div>
      </div>
      <div className="bg-primary-dark text-light py-4">
        <div className="container">
          <div className="mb-4">
            <a
              href="https://dceg.cancer.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light h4 mb-1"
            >
              Division of Cancer Epidemiology and Genetics
            </a>
            <div className="h6">
              at the{" "}
              <a
                className="text-light fw-semibold"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cancer.gov/"
              >
                National Cancer Institute
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="h5 mb-1 font-weight-light">
                CONTACT INFORMATION
              </div>
              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:NCIForgeDBWebAdmin@mail.nih.gov"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="h5 mb-1 font-weight-light">POLICIES</div>
              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.cancer.gov/policies/accessibility"
                  >
                    Accessibility
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.cancer.gov/policies/disclaimer"
                  >
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.cancer.gov/policies/foia"
                  >
                    FOIA
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.hhs.gov/vulnerability-disclosure-policy/index.html"
                  >
                    HHS Vulnerability Disclosure
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="h5 mb-1 font-weight-light">MORE INFORMATION</div>
              <ul className="list-unstyled mb-0">
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.hhs.gov/"
                  >
                    U.S. Department of Health and Human Services
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://www.nih.gov/"
                  >
                    National Institutes of Health
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.cancer.gov/"
                  >
                    National Cancer Institute
                  </a>
                </li>
                <li>
                  <a
                    className="text-light"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://usa.gov/"
                  >
                    USA.gov
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center">
          NIH ... Turning Discovery Into Health ®
        </div>
      </div>
    </footer>
  );
}
