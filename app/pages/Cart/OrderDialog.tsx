import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { MdClose, MdEmail, MdPerson, MdPhone } from 'react-icons/md';
import { useCart } from '~/contexts/CartContext';

interface OrderFormData {
    name: string;
    email: string;
    phone: string;
}

interface OrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function OrderDialog({ isOpen, onClose }: OrderDialogProps) {
    const { items, removeItem } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>();


  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => acc + item.Price * item.Quantity, 0);
    const totalWithVat = items.reduce((acc, item) => {
      const itemTotal = item.Price * item.Quantity;
      const itemWithVat = itemTotal * (1 + item.Vat / 100);
      return acc + itemWithVat;
    }, 0);
    return { subtotal, totalWithVat };
  };

  const { subtotal, totalWithVat } = calculateTotals();

  const generateCartSummary = () => {
    let summary = 'RESUMO DA ENCOMENDA:\n\n';
    
    items.forEach((item, index) => {
      const itemTotal = (item.Price * item.Quantity).toFixed(2);
      const itemWithVat = (item.Price * item.Quantity * (1 + item.Vat / 100)).toFixed(2);
      
      summary += `${index + 1}. ${item.Name}\n`;
      summary += `   Tipo: ${item.ItemType === 'BOX' ? 'Caixa' : 'Unitário'}\n`;
      summary += `   Quantidade: ${item.Quantity}\n`;
      summary += `   Preço (sem IVA): ${itemTotal}€\n`;
      summary += `   IVA: ${item.Vat}%\n`;
      summary += `   Total (com IVA): ${itemWithVat}€\n\n`;
    });

    summary += `-----------------------------------\n`;
    summary += `SUBTOTAL (sem IVA): ${subtotal.toFixed(2)}€\n`;
    summary += `TOTAL (com IVA): ${totalWithVat.toFixed(2)}€\n`;

    return summary;
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        from_phone: data.phone,
        order_summary: generateCartSummary(),
        subtotal: subtotal.toFixed(2),
        total: totalWithVat.toFixed(2),
        items_count: items.length,
        total_quantity: items.reduce((acc, item) => acc + item.Quantity, 0),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_API_KEY 
      );

      setSubmitStatus('success');
      
      setTimeout(() => {
        reset();
        items.map(item => removeItem(item))
        onClose();
        setSubmitStatus('idle');
      }, 2000);

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      items.map(item => removeItem(item))
      setSubmitStatus('idle');
      onClose();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Finalizar Encomenda</h3>
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-3">Resumo da Encomenda</h4>
          <div className="overflow-x-auto max-h-64">
            <table className="table table-xs table-zebra">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Tipo</th>
                  <th>Qtd</th>
                  <th>Preço</th>
                  <th>IVA</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Name}</td>
                    <td>{item.ItemType === 'BOX' ? 'Caixa' : 'Unit.'}</td>
                    <td>{item.Quantity}</td>
                    <td>{item.Price.toFixed(2)}€</td>
                    <td>{item.Vat}%</td>
                    <td>
                      {(item.Price * item.Quantity * (1 + item.Vat / 100)).toFixed(2)}€
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="divider my-2"></div>
          
          <div className="flex justify-between font-semibold">
            <span>Subtotal (sem IVA):</span>
            <span>{subtotal.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total (com IVA):</span>
            <span className="text-success">{totalWithVat.toFixed(2)}€</span>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  <MdPerson className="inline mr-1" />
                  Nome Completo *
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                {...register('name', {
                  required: 'Nome é obrigatório',
                })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
            </div>

            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  <MdEmail className="inline mr-1" />
                  Email *
                </span>
              </label>
              <input
                type="email"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  <MdPhone className="inline mr-1" />
                  Contacto Telefónico *
                </span>
              </label>
              <input
                type="tel"
                className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                {...register('phone', {
                  required: 'Contacto é obrigatório',
                  pattern: {
                    value: /^[0-9]{9}$/,
                    message: 'Contacto inválido (9 dígitos)',
                  },
                })}
              />
              {errors.phone && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.phone.message}</span>
                </label>
              )}
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="alert alert-success mt-4">
              <span>Encomenda enviada com sucesso!</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="alert alert-error mt-4">
              <span>Erro ao enviar encomenda. Tenta novamente.</span>
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleFormSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  A enviar...
                </>
              ) : (
                <>
                  <MdEmail />
                  Confirmar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}