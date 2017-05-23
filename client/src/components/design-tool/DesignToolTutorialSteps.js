export const tutorialSteps = [
  {
    text: 'Welcome to PCBflow! \n Would you like to take a quick tutorial?',
    nextButtonText: 'Start',
    shouldRenderBackButton: true,
    backButtonText: 'No Thanks',
  },
  {
    text: 'In this tutorial we\'ll build a Home Theatre PC device which can be conntected to a tv or monitor to play media from a mass storage device using a smart phone as a remote control. ',
    nextButtonText: 'Next',
    shouldRenderBackButton: true,
    backButtonText: 'Back',
    //image: {src: null, alt: 'image of completed project'},
    imageClassName: 'completed-tutorial-project' 
  },
  {
    text: 'First let\'s take a short tour...',
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Okay, now we\'re ready to get started! \n First drag and drop the COM connector module anywhere on the board',
    nextButtonText: 'Okay',
    nextButtonClass: 'com-connector-tooltip',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Nice! The COM or \'computer on module\' component will act as the control center for our HTPC. It is quite literally a computer which runs a linux or android operating system.\n The COM has a wide range of multimedia interfacing capabilities including: ',
    list: ['WiFi','HDMI','USB', 'Audio', 'Ethernet', 'RGB'],
    nextButtonText: 'Next',
    shouldRenderBackButton: false,
    backButtonText: 'Back'
  },
  {
    text: 'So which module should we add next? Let\'s take a look at the module pallate for some insight.',
    nextButtonText: 'Okay',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Go ahead and drag and drop the 5V/5A Regulator onto the board',
    nextButtonText: 'Okay',
    nextButtonClass: 'regulator-tooltip',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Great! You may have noticed that the COM Connector module turned green after you added the 5V/5A Regulator. Modules will dispaly red if they have unmet dependencies and green if all dependencies are satisfied', 
    nextButtonText: 'Next', 
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'So why exactly does the COM need a 5V/5A Regulator to function?\n This is becasue the COM is designed to operate at voltage in the range of 3.5V-6V, but as we\'ll see in the next step, our board will be running off of a 20V power supply. The 5V/5A Regulator will act as a voltage throttle, taking in 20 Volts and delivering 5 Volts to the COM.', 
    nextButtonText: 'Next', 
    nextButtonClass: 'barrel-connector-tooltip',
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'So how about that power supply?\n Let\'s add the DC Barrel Jack to give our HTPC some life...', 
    nextButtonText: 'Next', 
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
  {
    text: 'Now we\'ll be able to plug our HTCP into the wall with a standard 2.1mm x 5.5mm DC power supply', 
    nextButtonText: 'Next', 
    shouldRenderBackButton: true,
    backButtonText: 'Back'
  },
]