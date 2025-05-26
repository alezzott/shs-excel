import { render, screen } from '@testing-library/react'
import { Progress } from '../../progress'

test('renderiza o componente Progress', () => {
   render(<Progress value={50} />)
   expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

test('aplica className customizado', () => {
   render(<Progress value={30} className="custom-class" />)
   expect(screen.getByRole('progressbar')).toHaveClass('custom-class')
})

test('aplica o valor de progresso corretamente', () => {
   render(<Progress value={75} />)
   const indicator = screen.getByRole('progressbar').firstChild as HTMLElement
   expect(indicator).toHaveStyle('transform: translateX(-25%)')
})
