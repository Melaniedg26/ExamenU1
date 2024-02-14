package mx.edu.potros.calculadora_199818

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    private lateinit var numeroTextView: TextView
    private lateinit var resultadoTextView: TextView
    private var primerNumero = ""
    private var segundoNumero = ""
    private var operador = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        numeroTextView = findViewById(R.id.numero)
        resultadoTextView = findViewById(R.id.resultado)
    }

    fun onClickNumero(view: View) {
        if (view is Button) {
            val numero = view.text.toString()
            if (operador.isEmpty()) {
                primerNumero += numero
            } else {
                segundoNumero += numero
            }
            numeroTextView.text = primerNumero
        }
    }

    fun onClickOperador(view: View) {
        if (view is Button) {
            operador = view.text.toString()
            resultadoTextView.text = primerNumero
            primerNumero = ""
            segundoNumero = ""
            numeroTextView.text = ""
        }
    }

    fun onClickResultado(view: View) {
        val num1 = primerNumero.toDouble()
        val num2 = segundoNumero.toDouble()
        var resultado = 0.0
        when (operador) {
            "+" -> resultado = num1 + num2
            "-" -> resultado = num1 - num2
            "*" -> resultado = num1 * num2
            "/" -> {
                if (num2 != 0.0) {
                    resultado = num1 / num2
                } else {
                    // Manejar la división por cero aquí
                }
            }
        }
        resultadoTextView.text = resultado.toString()
        primerNumero = ""
        segundoNumero = ""
        operador = ""
        numeroTextView.text = ""
    }

    fun onClickBorrar(view: View) {
        primerNumero = ""
        segundoNumero = ""
        operador = ""
        numeroTextView.text = ""
        resultadoTextView.text = ""
    }
}