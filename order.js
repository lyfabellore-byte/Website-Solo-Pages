const productData = {
    "dont-be-late": {
        name: "Don't Be Late (Semi-Ringer Tee)",
        sizes: ["S", "M", "L", "XL", "2XL"]
    },
    "everyday-comfort": {
        name: "Everyday Comfort (Crew Neck T-Shirt)",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    "do-good-work": {
        name: "Do Good Work (Baggy T-Shirt)",
        sizes: ["L", "XL", "XXL", "XXXL"]
    }
};
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const productSelect = $('productName')
  , sizeSelect = $('size')
  , quantity = $('quantity');
function calcTotal() {
    $('total').value = 'PHP ' + (399 * (Number(quantity.value) || 1)).toLocaleString('en-PH');
}
function refreshSizes() {
    const p = productData[productSelect.value];
    sizeSelect.innerHTML = '<option value="">Choose size</option>';
    if (p)
        p.sizes.forEach(s => sizeSelect.add(new Option(s,s)));
    calcTotal();
}
productSelect.addEventListener('change', refreshSizes);
quantity.addEventListener('change', calcTotal);
if (params.get('product') && productData[params.get('product')])
    productSelect.value = params.get('product');
refreshSizes();
if (params.get('size') && [...sizeSelect.options].some(o => o.value === params.get('size')))
    sizeSelect.value = params.get('size');
if (params.get('color'))
    $('color').value = params.get('color');
if (params.get('qty'))
    quantity.value = String(Math.min(5, Math.max(1, Number(params.get('qty')) || 1)));
calcTotal();
$('orderForm').addEventListener('submit', e => {
    e.preventDefault();
    const p = productData[productSelect.value];
    if (!p)
        return;
    const data = {
        name: $('customerName').value.trim(),
        email: $('customerEmail').value.trim(),
        contact: $('contact').value.trim(),
        address: $('address').value.trim(),
        product: p.name,
        size: sizeSelect.value,
        color: $('color').value,
        qty: Number(quantity.value),
        total: 399 * Number(quantity.value),
        notes: $('notes').value.trim() || 'None'
    };
    const subject = encodeURIComponent('TEESKOLAR Order - ' + p.name);
    const body = encodeURIComponent(`TEESKOLAR ORDER\n\nCustomer name: ${data.name}\nCustomer email: ${data.email}\nContact number: ${data.contact}\nDelivery address: ${data.address}\n\nProduct: ${data.product}\nQuantity: ${data.qty}\nSize: ${data.size}\nColor: ${data.color}\nPrice per shirt: PHP 399\nTotal: PHP ${data.total}\n\nAdditional notes: ${data.notes}`);
    location.href = `mailto:orders@examplewebsite142.com?subject=${subject}&body=${body}`;
}
);
