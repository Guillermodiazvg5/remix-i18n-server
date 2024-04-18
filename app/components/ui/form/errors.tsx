import { P } from '../typography/p';

type Props = {
  readonly errors?: string[];
};

const Errors: React.FC<Props> = ({ errors }) => {
  if (!errors?.length) {
    return null;
  }
  return (
    <div className="absolute">
      {errors.map((error, index) => (
        <P className="text-sm text-red-500" key={index}>
          {error}
        </P>
      ))}
    </div>
  );
};

export default Errors;
