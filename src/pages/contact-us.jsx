import { BackButton } from 'components/back-button';
import { titleGenerator } from 'utils/title-generator';

function ContactUsPage() {
  titleGenerator('Contact Us');

  return (
    <div className="w-full px-5">
      <div className="animate__animated animate__fadeIn flex shadow-lg flex-col bg-slate-100 dark:bg-slate-700 p-5 rounded-lg max-w-lg mx-auto mt-10">
        <h3 className="mb-2 text-2xl font-bold text-rose-500">Contact Us</h3>
        <p className="text-sm leading-7">Address: Tehran, Esfahan</p>
        <p className="text-sm leading-7">PhoneNumber: +989131087927</p>
        <p className="text-sm leading-7 mb-10">Email: shervin.shaghaghi@gmail.com</p>

        <BackButton />
      </div>
    </div>
  );
}
export { ContactUsPage };
