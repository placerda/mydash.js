var SmoothedThroughputRule;

function SmoothedThroughputClass() {

  let factory = dashjs.FactoryMaker;
  let SwitchRequest = factory.getClassFactoryByName('SwitchRequest');
  let MetricsModel = factory.getSingletonFactoryByName('MetricsModel');
  let context = this.context;

  function getMaxIndex(rulesContext) {
    // here you can get some informations aboit metrics for example, to implement the rule
    let metricsModel = MetricsModel(context).getInstance();
    var mediaType = rulesContext.getMediaInfo().type;
    var metrics = metricsModel.getReadOnlyMetricsFor(mediaType);

    // this sample only display metrics in console
    console.log(metrics);

    return SwitchRequest(context).create();
  }

  const instance = {
      getMaxIndex: getMaxIndex
  };
  return instance;


}

SmoothedThroughputClass.__dashjs_factory_name = 'SmoothedThroughput';
SmoothedThroughputRule = dashjs.FactoryMaker.getClassFactory(SmoothedThroughputClass);
