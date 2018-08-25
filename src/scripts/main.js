import '../styles/main.scss';

import naturalSort from 'javascript-natural-sort';
import uniq from 'lodash/uniq';
import indexOf from 'lodash/indexOf';
import postcss from 'postcss';
import {calculate} from 'specificity';

import {
  renderMainChart,
  renderSpecificityGroupsColumnChart,
  renderSpecificityGroupsPieChart
} from 'charts';

const classFormErrorHidden = 'form__error_hidden';
const classChartsHidden = 'charts_hidden';

const selectorForm = '.js-form';
const selectorTextarea = '.js-form-textarea';
const selectorErrorMessage = '.js-form-error';
const selectorCharts = '.js-charts';

const elementForm = document.querySelector(selectorForm);
const elementTextarea = document.querySelector(selectorTextarea);
const elementErrorMessage = document.querySelector(selectorErrorMessage);
const elementCharts = document.querySelector(selectorCharts);

let mainChartDataSeries;
let specificityUsages;
let specificityUsagesDataSeries;
let textareaContent;
let ast;
let specificities;
let mainChartYAxisCategories;

const isValidAtRule = (rule) =>
  rule.parent.type === 'atrule' && ['media', 'supports', 'document'].includes(rule.parent.name);

const isValidSelector = (rule) => rule.parent.type === 'root' || isValidAtRule(rule);

const removeInlineStyleCategory = (str) => str.replace('0,', '');

// build up comma-separted string with all valid selectors
const getAllSelectors = () => {
  const selectors = [];

  ast.walkRules((rule) => {
    if (isValidSelector(rule)) {
      selectors.push(...rule.selectors.filter((item) => item !== ''));
    }
  });

  return selectors.join();
};

const getSortedKeysByValue = (obj) => Object.keys(obj).sort((keyA, keyB) => -(obj[keyA] - obj[keyB]));

// main form submit
elementForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // reset variables
  mainChartDataSeries = {
    idCategory: [],
    classCategory: [],
    elementCategory: []
  };
  specificityUsages = {};

  textareaContent = elementTextarea.value;

  if (textareaContent.trim() === '') {
    elementErrorMessage.classList.remove(classFormErrorHidden);
    return;
  }

  try {
    ast = postcss.parse(textareaContent);
  } catch (error) {
    if (error.name === 'CssSyntaxError') {
      elementErrorMessage.classList.remove(classFormErrorHidden);
      return;
    }
  }

  // data is valid, make charts visible
  elementCharts.classList.remove(classChartsHidden);
  elementErrorMessage.classList.add(classFormErrorHidden);

  // calculate data for main chart
  specificities = calculate(getAllSelectors());
  mainChartYAxisCategories = uniq(
    specificities.map((element) => removeInlineStyleCategory(element.specificity))
  ).sort(naturalSort);

  specificities.forEach((element, index) => {
    if (element.specificity.indexOf('0,0,0,') === 0) {
      mainChartDataSeries.elementCategory.push([
        index,
        indexOf(mainChartYAxisCategories, removeInlineStyleCategory(element.specificity))
      ]);
    } else if (element.specificity.indexOf('0,0,') === 0) {
      mainChartDataSeries.classCategory.push([
        index,
        indexOf(mainChartYAxisCategories, removeInlineStyleCategory(element.specificity))
      ]);
    } else {
      mainChartDataSeries.idCategory.push([
        index,
        indexOf(mainChartYAxisCategories, removeInlineStyleCategory(element.specificity))
      ]);
    }

    specificityUsages[element.specificity] = (specificityUsages[element.specificity] || 0) + 1;
  });

  specificityUsagesDataSeries = getSortedKeysByValue(specificityUsages).map((element) => {
    return {
      name: removeInlineStyleCategory(element),
      y: specificityUsages[element]
    };
  });

  renderMainChart(specificities, mainChartYAxisCategories, mainChartDataSeries);
  renderSpecificityGroupsColumnChart(specificityUsagesDataSeries);
  renderSpecificityGroupsPieChart(specificityUsagesDataSeries);
});
