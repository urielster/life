import "./RulesEditor.less"
import {AntColor} from "../ant/AntColor";
import React, {Fragment} from "react";
import {IRules, rules} from "../rules/Rules";
import {AntStatus} from "../ant/AntStatue";

interface IRulesEditorProps {
}

interface ITxtFunctionHolder {
  [key: string]: string;
}

export const RulesEditor = (props: IRulesEditorProps) => {
  const options = [
    {label: AntColor.Black, value: AntColor.Black},
    {label: AntColor.Red, value: AntColor.Red},
  ];

  const removeStatusEnum = (funTxt: string): string => {
    return (funTxt.indexOf('/*>*/') >= 0) ? funTxt.slice(funTxt.indexOf(`/*<*/`) + 5) : funTxt;
  }
  const removeBrackets = (funTxt: string): string => {
    const regex = /^(\(.*\){)|{/gm;//check that this starts with { or (){
    return (funTxt.match(regex)) ? funTxt.slice(funTxt.indexOf("{") + 1, funTxt.lastIndexOf("}") - 1).trim() : funTxt;
  }

  const getAllFunctions = (rules: IRules): { [key: string]: string; } => {
    // console.log('rules', Object.entries(rules));
    const newObj: ITxtFunctionHolder = {};//let's use dictionary other than array
    Object.entries(rules).map(entry => {
      newObj[entry[0].toString()] = removeStatusEnum(removeBrackets(entry[1].toString().trim()));
    });
    return newObj;
  }

  const [antColor, setAntColor] = React.useState(AntColor.Red);
  const [rulesTxt, setRulesTxt] = React.useState(getAllFunctions(rules.getRules(antColor)));

  const handleChange = (event: any) => {
    setAntColor(event.target.value);
    const rulesCopy = (rules.getRules(event.target.value));
    const rulesInTextMode = (getAllFunctions(rulesCopy));
    setRulesTxt(rulesInTextMode);
  };


  const onChangeRulesDialog = (key: string, val: string) => {
    const newObj = {
      ...rulesTxt,
      ...{[key]: val}
    }
    setRulesTxt(newObj);
  }

  //Enum doesn't work in run time
  const getStatusString = (): string => {
    return `/*>*/
    const AntStatus = ${JSON.stringify(AntStatus)};
    const sdk = (typeof(args) !== 'undefined' ? args[0] : arguments[0]);
    const ant = (typeof(args) !== 'undefined' ? args[1] : arguments[1]);
    /*<*/ `;
  }

  const crystallize = (funTxt: string): Function => {
    let funBody = funTxt;

    //AntStatus doesnt exists outside react - let recreate it
    funBody = getStatusString() + funBody;

    console.log(funBody)
    return (new Function(funBody));
  };

  const onSaveRules = () => {
    const rulesObj: any = {};

    Object.entries(rulesTxt).forEach(
      ([key, value]) => {
        rulesObj[key] = crystallize(value);
      }
    );

    rules.setRules(rulesObj, antColor);
  };


  return (
    <div className={'rules-editor'}>
      <Dropdown
        options={options}
        value={antColor}
        onChange={handleChange}
      />
      <FunctionForm funList={rulesTxt} onChangeRulesDialog={onChangeRulesDialog}></FunctionForm>
      <div className={'rules-editor-save'}>
        <button className={'rules-editor-form-save'} onClick={() => {
          onSaveRules()
        }}>save
        </button>
      </div>
    </div>
  );
};

interface IDropDownProps {
  value: string;
  options: any;
  onChange: (event: any) => void;
}

const Dropdown = (props: IDropDownProps) => {
  const fixCapitalization = (txt: string): string => {

    const newTxt = txt.split(' ').map(t => (t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())).join(' ');
    return newTxt;
  }

  return (
    <div className={'drop-down-rules'}>
      <select value={props.value} onChange={props.onChange}>
        {props.options.map((option: any) => (
          <option key={'option-' + option.label}
                  value={option.value}>{fixCapitalization(option.label + ' Ants')}</option>
        ))}
      </select>
    </div>
  );
};

interface IFunctionFormProps {
  funList: ITxtFunctionHolder;
  onChangeRulesDialog: (fun: string, val: string) => void
}

const FunctionForm = (props: IFunctionFormProps) => {

  return (
    <div className={'rules-editor-form'}>
      {Object.entries(props.funList).map(([fnKey, fnVal]) => {
          return (
            <Fragment key={'f' + fnKey}>
              <div className={'rules-editor-form-label'}>{fnKey}</div>
              <div className={'rules-editor-form-input'}>
              <textarea onChange={(e) => {
                props.onChangeRulesDialog(fnKey, e.target.value);
              }} value={fnVal} key={'textarea-' + fnKey}></textarea></div>
            </Fragment>
          );
        }
      )}
    </div>)
}
