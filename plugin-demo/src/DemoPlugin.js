import React, { useDebugValue } from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin, loadCSS } from 'flex-plugin';
import * as Flex from '@twilio/flex-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers, { namespace } from './states';
import VideoKyc from './components/Video';
import Crm from './components/Crm';
import styleConfig from './StyleConfig';

const PLUGIN_NAME = 'DemoPlugin';

export default class DemoPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    // load css file (app.css)
    loadCSS('https://sienna-kakapo-9904.twil.io/assets/app.css');

    // default styles
    flex.MainHeader.defaultProps.logoUrl = 'https://sienna-kakapo-9904.twil.io/assets/grab_logo_green.png';
    manager.updateConfig(styleConfig.branding);

    // default view - hide crm panel
    flex.AgentDesktopView.defaultProps.showPanel2 = false; 

    // add video tab after task is accepted
    this.afterAcceptTask(flex, manager);

    // close crm after task is completed
    this.afterCompleteTask(flex, manager);
  }

  afterAcceptTask(flex, manager) {
    flex.Actions.addListener('afterAcceptTask', (task) => {
      // add video component to TaskCanvasTab
      flex.TaskCanvasTabs.Content.add(
        <Flex.Tab icon="Video" iconActive="VideoBold" key="video-tab">
          <MuiThemeProvider>
            <VideoKyc identity={task.task.attributes.identity} token={task.task.attributes.token} room={task.task.attributes.room} />
          </MuiThemeProvider>
        </Flex.Tab>
      );

      // replace and show crm container after task is accepted
      flex.AgentDesktopView.defaultProps.showPanel2 = true;
      flex.AgentDesktopView.Panel2.Content.replace(<Crm key="crm-container" identity={task.task.attributes.custId} />);
      manager.updateConfig(styleConfig.acceptTask);
    });
  }

  afterCompleteTask(flex, manager) {
    // remove videoTab to prevent rendering errors
    // remove crm container and component
    flex.Actions.addListener('afterCompleteTask', (task) => {
      flex.TaskCanvasTabs.Content.remove("video-tab");
      flex.AgentDesktopView.Panel2.Content.remove("crm-container");
      flex.AgentDesktopView.defaultProps.showPanel2 = false;
      manager.updateConfig(styleConfig.completeTask);
    });
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
