import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: 'One Proof of Space',
  options: optionsForPlotter(PlotterName.ONEPOS),
  defaults: defaultsForPlotter(PlotterName.ONEPOS),
  installInfo: { installed: true },
};
