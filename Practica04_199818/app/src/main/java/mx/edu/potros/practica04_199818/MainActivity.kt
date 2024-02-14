package mx.edu.potros.practica04_199818

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val pesoK:EditText=findViewById(R.id.editTextNumberDecimal)
        val alturaE:EditText=findViewById(R.id.editTextNumberDecimal2)
        val calcular:Button=findViewById(R.id.button)
        val imc:TextView=findViewById(R.id.textView)
        val rango:TextView=findViewById(R.id.textView2)

        calcular.setOnClickListener{
            var peso:Double=0.0
            var estatura:Double=0.0
            try{
                peso=pesoK.text.toString().toDouble()
                estatura=alturaE.text.toString().toDouble()

            }catch(e:java.lang.Exception){
                imc.setText("Debe ingresar valores reales")
                print(e)
            }
            var resultado=calcularIMC(peso,estatura)
            val formattedNumber="%.2f".format(resultado)
            imc.setText(formattedNumber)
            var salud:String
            var color:Int

            when{
                resultado<18.5->{
                    salud="Bajo Peso"
                    color=R.color.colorRed
                }
                resultado>=18.5&&resultado<=24.9->{
                    salud="Saludable"
                    color=R.color.colorGreenish
                }
                resultado>=25&&resultado<=29.9->{
                    salud="Sobrepeso"
                    color=R.color.colorYellow
                }
                resultado>=30&&resultado<=34.9->{
                    salud="Obesidad Grado 1"
                    color=R.color.colorOrange
                }
                resultado>=35&&resultado<=39.9->{
                    salud="Obesidad Grado 2"
                    color=R.color.colorBrown
                }
                resultado>=40->{
                    salud="Obesidad Grado 3"
                    color=R.color.colorRed
                }
                else->{
                    salud="Error"
                    color=0
                }
            }
            rango.setBackgroundResource(color)
            rango.setText(salud)
        }
    }
    fun calcularIMC(weight:Double,height:Double):Double{
        return weight/(height*height)
    }
}