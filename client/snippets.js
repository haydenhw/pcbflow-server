import shortid from 'shortid';
import PropTypes from 'prop-types';

shortid.generate();

LandingPageCard.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
