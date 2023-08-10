'use client';
import LinkButton from '../../../components/button/link-button';

const DownloadBrochure = () => {
  return (
    <section className="container py-8">
      <LinkButton
        text="Download Brochure"
        clickEvent={() => null}
        className="w-full max-w-[260px] px-4 mx-auto"
      />
    </section>
  );
}

export default DownloadBrochure;