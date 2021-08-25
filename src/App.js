import Mobile from './views/Mobile';
import PC from './views/PC';
import "plyr/dist/plyr.css";

function App() {
  const isMobile = () => {
    const scrren = window.innerWidth || document.documentElement.offsetWidth;
    const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    const isMobile = reg.test(navigator.userAgent) || ('ontouchend' in document.body) || (scrren < 768);

    if (isMobile) {
      document.body.classList.add('m-body');
      document.documentElement.classList.add('m-html');
    }

    return isMobile;
  }
  return (
    (<div className="app-wrapper">
      {
        isMobile() ? <Mobile /> : <PC />
      }
    </div>)
  );
}

export default App;

