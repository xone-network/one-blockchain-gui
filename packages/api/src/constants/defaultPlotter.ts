import defaultsForPlotter from '../utils/defaultsForPlotter';
import optionsForPlotter from '../utils/optionsForPlotter';
import PlotterName from './PlotterName';

export default {
  displayName: 'One Proof of Space',
  options: optionsForPlotter(PlotterName.ONEPOS),
  defaults: defaultsForPlotter(PlotterName.ONEPOS),
  installInfo: { installed: true },
};
