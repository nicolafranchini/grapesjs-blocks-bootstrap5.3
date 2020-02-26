import _s from "underscore.string";
import contexts from '../bootstrap-contexts';

export default (domc) => {
    const textType = domc.getType('text');
    const textModel = textType.model;
    const textView = textType.view;

    domc.addType('badge', {
        model: textModel.extend({
            defaults: Object.assign({}, textModel.prototype.defaults, {
                'custom-name': 'Badge',
                tagName: 'span',
                classes: ['badge'],
                traits: [
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'None'},
                            ... contexts.map(function(v) { return {value: 'badge-'+v, name: _s.capitalize(v)} })
                        ],
                        label: 'Context'
                    },
                    {
                        type: 'class_select',
                        options: [
                            {value: '', name: 'Default'},
                            {value: 'badge-pill', name: 'Pill'},
                        ],
                        label: 'Shape'
                    }
                ].concat(textModel.prototype.defaults.traits)
            })
        }, {
            isComponent(el) {
                if(el && el.classList && el.classList.contains('badge')) {
                    return {type: 'badge'};
                }
            }
        }),
        view: textView
    });
}
