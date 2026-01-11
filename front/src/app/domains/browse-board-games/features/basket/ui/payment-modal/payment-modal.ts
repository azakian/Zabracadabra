import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form, maxLength, pattern, required } from '@angular/forms/signals';
import { Payment } from './payment';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.html',
  styleUrl: './payment-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Field],
})
export class PaymentModal {
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly close = output<void>();
  readonly confirmPayment = output<string>();

  state = signal<Payment>({
    cardNumber: '',
    cardHolder: 'SECRET SANTA',
    expiryDate: '04/26',
    cvv: '123',
  });
  readonly paymentForm = form(this.state, (schemaPath) => {
    maxLength(schemaPath.cardNumber, 19);
    maxLength(schemaPath.expiryDate, 5);
    maxLength(schemaPath.cvv, 4);

    pattern(schemaPath.cardNumber, /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);
    pattern(schemaPath.expiryDate, /^(0[1-9]|1[0-2])\/\d{2}$/);

    required(schemaPath.cardNumber);
    required(schemaPath.cardHolder);
    required(schemaPath.expiryDate);
    required(schemaPath.cvv);
  });

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    if (this.paymentForm().valid()) {
      this.confirmPayment.emit(this.paymentForm.cardNumber().value());
    }
  }

  readonly formattedCardNumber = computed(() => {
    let value = this.paymentForm.cardNumber().value().replace(/\D/g, '');
    value = value.substring(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    return value;
  });

  formatExpiryDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 4);
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    this.state.update((state) => ({ ...state, expiryDate: value }));
  }
}
