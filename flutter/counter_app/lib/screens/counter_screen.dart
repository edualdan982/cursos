import 'package:flutter/material.dart';

class CounterScreen extends StatefulWidget {
  const CounterScreen({Key? key}) : super(key: key);

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int counter = 0;

  void increase() {
    counter++;
    setState(() {});
  }

  void decrease() {
    counter--;
    setState(() {});
  }

  void restore() {
    counter = 0;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    const fontSize30 = TextStyle(fontSize: 30);

    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 82, 123, 170),
      appBar: AppBar(
        title: const Text('EdualApp'),
        elevation: 10.0,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            const Text('Número de Clicks', style: fontSize30),
            Text(
              '$counter',
              style: fontSize30,
            ),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: CustomFloatingActions(
        inscreaseFn: increase,
        decreaseFn: decrease,
        restoreFn: restore,
      ),
    );
  }
}

class CustomFloatingActions extends StatelessWidget {
  final Function inscreaseFn;
  final Function decreaseFn;
  final Function restoreFn;

  const CustomFloatingActions({
    Key? key,
    required this.inscreaseFn,
    required this.decreaseFn,
    required this.restoreFn,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        FloatingActionButton(
          child: const Icon(Icons.minimize),
          onPressed: () => decreaseFn(),
        ),
        FloatingActionButton(
            child: const Icon(Icons.restart_alt_rounded),
            onPressed: () => restoreFn()),
        FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: () => inscreaseFn(),
        ),
      ],
    );
  }
}
