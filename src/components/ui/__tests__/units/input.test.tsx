import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../input'

test('renderiza o input e permite digitação', () => {
   render(<Input placeholder="Digite aqui" />)
   const input = screen.getByPlaceholderText('Digite aqui')
   fireEvent.change(input, { target: { value: 'teste' } })
   expect(input).toHaveValue('teste')
})

test('aplica className customizado', () => {
   render(<Input className="custom-class" />)
   expect(screen.getByRole('textbox')).toHaveClass('custom-class')
})
