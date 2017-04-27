import Confirmation from 'components/projects/ProjectsConfirmation';
import { createConfirmation } from 'react-confirm';

const confirm = createConfirmation(Confirmation);

export default function (confirmation, options = {}) {
  return confirm({ confirmation, ...options });
}
