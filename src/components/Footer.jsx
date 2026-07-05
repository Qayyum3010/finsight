function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant bg-surface py-lg dark:border-outline dark:bg-surface-container-lowest">
      <div className="flex flex-col items-center gap-xs px-margin-mobile text-center md:px-margin-desktop">
        <span className="font-label text-label font-bold text-on-surface dark:text-on-surface-variant">
          FinSight
        </span>
        <span className="font-small text-small text-on-surface-variant dark:text-outline">
          FinSight — Demo Dashboard
        </span>
      </div>
    </footer>
  );
}

export default Footer;
