({

    // Your renderer method overrides go here
    render: function (component, helper) {
        console.log('⚡ render: El componente se está creando');
        return this.superRender();
    },

    afterRender: function (component, helper) {
        this.superAfterRender();
        console.log('✅ afterRender: El componente es visible');

        let container = component.find('mainContainer').getElement();
        container.style.border = '2px solid blue';

    },

    rerender: function (component, helper) {
        this.superRerender();
        console.log('🔄 rerender: Atributos cambiaron');

        let precio = component.get('v.priceProduct');
        let container = component.find('mainContainer').getElement();

        if (precio > 1500) {
            container.style.backgroundColor = '#ffcccc';
        } else {
            container.style.backgroundColor = '#ccffcc';
        }
    },

    unrender: function (component, helper) { 
        this.superUnrender();
        console.log('❌ unrender: Componente destruido');
    }
})