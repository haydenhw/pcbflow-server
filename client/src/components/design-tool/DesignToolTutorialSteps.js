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
    image: 'images/design-tool-screenshot.png',
    imageClassName: 'completed-tutorial-project' 
  },
  {
    text: 'First let\'s take a quick tour...',
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
    text: 'Nice! The COM connenctor is ...',
    nextButtonText: 'Okay',
    shouldRenderBackButton: false,
    backButtonText: 'Back'
  },
  
]