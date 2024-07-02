import '../../assets/scss/Toggle2Button.scss';

type props = {
  label1: string
  label2: string
}

export default function Toggle2Button({
  label1, label2
}: props) {
  return (
    <div className="switch">
      <input type="radio" id="switch1" name="switch" className={label1 === 'Show' ? 'label-show' : 'label-frax'} />
      <label htmlFor="switch1" />
      <input type="radio" id="switch2" name="switch" className={label2 === 'Hide' ? 'label-hide' : 'label-crv'} />
      <label htmlFor="switch2" />
      <div className="switch__inner" />
    </div>
  )
}